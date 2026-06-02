import Foundation
import ImageIO
import Vision

func orientation(from rawValue: UInt32) -> CGImagePropertyOrientation {
  switch rawValue {
  case 1: return .up
  case 2: return .upMirrored
  case 3: return .down
  case 4: return .downMirrored
  case 5: return .leftMirrored
  case 6: return .right
  case 7: return .rightMirrored
  case 8: return .left
  default: return .up
  }
}

let paths = Array(CommandLine.arguments.dropFirst())

if paths.isEmpty {
  fputs("Usage: swift scripts/ocr.swift <image> [...]\n", stderr)
  exit(1)
}

for path in paths {
  let url = URL(fileURLWithPath: path)
  guard let source = CGImageSourceCreateWithURL(url as CFURL, nil),
        let image = CGImageSourceCreateImageAtIndex(source, 0, nil) else {
    print("FILE\t\(path)\tERROR\tCould not read image")
    continue
  }

  let properties = CGImageSourceCopyPropertiesAtIndex(source, 0, nil) as? [CFString: Any]
  let rawOrientation = properties?[kCGImagePropertyOrientation] as? UInt32 ?? 1
  let request = VNRecognizeTextRequest()
  request.recognitionLevel = .accurate
  request.usesLanguageCorrection = false
  request.minimumTextHeight = 0.005

  let handler = VNImageRequestHandler(
    cgImage: image,
    orientation: orientation(from: rawOrientation),
    options: [:]
  )

  do {
    try handler.perform([request])
    let observations = request.results ?? []
    let rows = observations.compactMap { observation -> (text: String, x: Double, y: Double, confidence: Float)? in
      guard let candidate = observation.topCandidates(1).first else {
        return nil
      }
      return (
        candidate.string,
        Double(observation.boundingBox.origin.x),
        Double(observation.boundingBox.origin.y),
        candidate.confidence
      )
    }
    .sorted {
      if abs($0.y - $1.y) > 0.012 {
        return $0.y > $1.y
      }
      return $0.x < $1.x
    }

    print("FILE\t\(path)")
    for row in rows {
      print(String(format: "%.3f\t%.3f\t%.2f\t%@", row.y, row.x, row.confidence, row.text))
    }
  } catch {
    print("FILE\t\(path)\tERROR\t\(error)")
  }
}
