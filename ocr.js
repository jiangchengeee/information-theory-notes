ObjC.import('Foundation');
ObjC.import('AppKit');
ObjC.import('Vision');

function ocr(path) {
  const url = $.NSURL.fileURLWithPath($(path));
  const req = $.VNRecognizeTextRequest.alloc.init;
  req.recognitionLevel = 0;
  req.recognitionLanguages = $(['zh-Hans', 'en-US']);
  req.usesLanguageCorrection = true;
  const handler = $.VNImageRequestHandler.alloc.initWithURLOptions(url, $.NSDictionary.dictionary);
  handler.performRequestsError($([req]), null);
  const results = req.results;
  const out = [];
  if (results) {
    for (let i = 0; i < results.count; i++) {
      const o = results.objectAtIndex(i);
      const cands = o.topCandidates(1);
      if (cands.count > 0) {
        const bb = o.boundingBox;
        out.push({
          y: 1 - (bb.origin.y + bb.size.height / 2),
          x: bb.origin.x,
          s: ObjC.unwrap(cands.objectAtIndex(0).string)
        });
      }
    }
  }
  out.sort((a, b) => Math.abs(a.y - b.y) > 0.012 ? a.y - b.y : a.x - b.x);
  return out.map(o => o.s).join('\n');
}

function run(argv) {
  const res = [];
  for (let i = 0; i < argv.length; i++) {
    const p = argv[i];
    res.push('===== ' + p + ' =====');
    try { res.push(ocr(p)); } catch (e) { res.push('ERR ' + e); }
  }
  return res.join('\n');
}
