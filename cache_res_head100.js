// == Cache Resource Replace: Head Lock Bundle ==

const TARGET = "cache_res.OdVY88vqa9NcdHWx8dKH1EWvhoo~3D";
const BASE64_URL = "https://raw.githubusercontent.com/dtiendzai123/noidungcachehead100/main/cache_res.OdVY88vqa9NcdHWx8dKH1EWvhoo~3D%2520.bundle.base64";

if ($request.url.includes(TARGET)) {
  $httpClient.get(BASE64_URL, function (error, response, body) {
    if (error || !body) {
      console.log("❌ Lỗi tải file base64:", error || "Không có nội dung.");
      return $done({});
    }

    try {
      const cleanBase64 = body.trim();
      const binaryData = $text.base64Decode(cleanBase64);
      return $done({
        status: 200,
        headers: {
          "Content-Type": "application/octet-stream",
          "Cache-Control": "max-age=86400", // cache trong 1 ngày
          "Content-Disposition": "inline; filename=cache.bundle"
        },
        body: binaryData
      });
    } catch (e) {
      console.log("❌ Lỗi giải mã base64:", e);
      return $done({});
    }
  });
} else {
  $done({});
}
