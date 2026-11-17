#!/bin/bash
cd /Users/ALIENWARE/Desktop/信息论
: > .tmp/book_ocr.txt
for f in .tmp/pages/p*.png; do
  echo "=== ${f##*/} ===" >> .tmp/book_ocr.txt
  osascript -l JavaScript ocr.js "$f" | sed '1,2d' >> .tmp/book_ocr.txt
done
echo ALL_OCR_DONE
