import AppKit
import Foundation
import PDFKit

guard CommandLine.arguments.count == 4 else {
  fputs("Usage: swift scripts/render-pdf-page.swift <input.pdf> <page-1-based> <output.png>\n", stderr)
  exit(1)
}

let inputURL = URL(fileURLWithPath: CommandLine.arguments[1])
let pageNumber = Int(CommandLine.arguments[2]) ?? 1
let outputURL = URL(fileURLWithPath: CommandLine.arguments[3])

guard let document = PDFDocument(url: inputURL), let page = document.page(at: pageNumber - 1) else {
  fputs("Could not open PDF page\n", stderr)
  exit(1)
}

let scale: CGFloat = 3.0
let bounds = page.bounds(for: .mediaBox)
let size = NSSize(width: bounds.width * scale, height: bounds.height * scale)
let image = NSImage(size: size)

image.lockFocus()
NSColor.white.setFill()
NSRect(origin: .zero, size: size).fill()
if let context = NSGraphicsContext.current?.cgContext {
  context.saveGState()
  context.scaleBy(x: scale, y: scale)
  page.draw(with: .mediaBox, to: context)
  context.restoreGState()
}
image.unlockFocus()

guard
  let tiff = image.tiffRepresentation,
  let bitmap = NSBitmapImageRep(data: tiff),
  let png = bitmap.representation(using: .png, properties: [:])
else {
  fputs("Could not encode PNG\n", stderr)
  exit(1)
}

try FileManager.default.createDirectory(
  at: outputURL.deletingLastPathComponent(),
  withIntermediateDirectories: true
)
try png.write(to: outputURL)
