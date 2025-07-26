// == Free Fire File Replacer Script ==
class FFFileReplacer {
  constructor() {
    this.TARGET = "cache_res.OdVY88vqa9NcdHWx8dKH1EWvhoo~3D";
    this.BASE64_URL = "https://raw.githubusercontent.com/dtiendzai123/noidungcachehead100/main/cache_res.OdVY88vqa9NcdHWx8dKH1EWvhoo~3D%2520.bundle.base64";
    this.isProcessing = false;
  }

  // Tải file base64 từ URL
  async downloadBase64File(url) {
    try {
      console.log(`📥 Đang tải file từ: ${url}`);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const base64Data = await response.text();
      console.log("✅ Tải file thành công!");
      return base64Data.trim();
    } catch (error) {
      console.error("❌ Lỗi khi tải file:", error);
      throw error;
    }
  }

  // Chuyển đổi base64 thành blob
  base64ToBlob(base64Data, contentType = "application/octet-stream") {
    try {
      const base64 = base64Data.replace(/^data:[^;]+;base64,/, "");
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: contentType });
    } catch (error) {
      console.error("❌ Lỗi khi chuyển đổi base64:", error);
      throw error;
    }
  }

  // Tạo URL tải xuống
  createDownloadUrl(blob, filename) {
    const url = URL.createObjectURL(blob);
    return { url, filename };
  }

  // Tự động tải file xuống
  downloadFile(url, filename) {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Xử lý thay thế file chính
  async replaceFile(customUrl = null, customTarget = null) {
    if (this.isProcessing) {
      console.log("⚠️ Đang xử lý, vui lòng đợi...");
      return;
    }

    try {
      this.isProcessing = true;
      const url = customUrl || this.BASE64_URL;
      const target = customTarget || this.TARGET;

      console.log("=== 🛠️ BẮT ĐẦU QUÁ TRÌNH THAY THẾ FILE ===");
      console.log(`🎯 Target file: ${target}`);
      console.log(`🌐 Source URL: ${url}`);

      const base64Data = await this.downloadBase64File(url);
      console.log(`📦 Kích thước base64: ${base64Data.length} ký tự`);

      const blob = this.base64ToBlob(base64Data);
      console.log(`📂 Kích thước file: ${blob.size} bytes`);

      const downloadInfo = this.createDownloadUrl(blob, target);
      console.log("✅ FILE THAY THẾ ĐÃ SẴN SÀNG");
      console.log(`📁 File name: ${downloadInfo.filename}`);
      console.log(`📏 File size: ${blob.size} bytes`);

      this.downloadFile(downloadInfo.url, downloadInfo.filename);

      console.log("✅ Hoàn thành! File đã được tải xuống.");
      return {
        success: true,
        filename: downloadInfo.filename,
        size: blob.size,
        message: "File thay thế đã được tạo và tải xuống thành công!"
      };
    } catch (error) {
      console.error("❌ Lỗi trong quá trình thay thế file:", error);
      return {
        success: false,
        error: error.message,
        message: "Có lỗi xảy ra khi thay thế file!"
      };
    } finally {
      this.isProcessing = false;
    }
  }

  // Kiểm tra trạng thái
  getStatus() {
    return {
      isProcessing: this.isProcessing,
      target: this.TARGET,
      baseUrl: this.BASE64_URL
    };
  }

  // Cập nhật cấu hình
  updateConfig(newTarget, newUrl) {
    this.TARGET = newTarget;
    this.BASE64_URL = newUrl;
    console.log("⚙️ Cấu hình đã được cập nhật:", {
      target: this.TARGET,
      url: this.BASE64_URL
    });
  }

  // Xác thực URL
  validateUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // Chạy với cấu hình tùy chỉnh
  async runCustomReplace(config) {
    if (!config.url || !config.target) {
      throw new Error("Thiếu thông tin URL hoặc target file");
    }

    if (!this.validateUrl(config.url)) {
      throw new Error("URL không hợp lệ");
    }

    return await this.replaceFile(config.url, config.target);
  }
}

// Khởi tạo
const fileReplacer = new FFFileReplacer();

// Hàm chạy nhanh
async function quickReplace() {
  console.log("🚀 Bắt đầu thay thế file…");
  const result = await fileReplacer.replaceFile();
  if (result.success) {
    console.log("✅ Thành công:", result.message);
  } else {
    console.log("❌ Thất bại:", result.message);
  }
  return result;
}

// Hàm thay thế với cấu hình tùy chỉnh
async function customReplace(url, target) {
  console.log("🚀 Bắt đầu thay thế file với cấu hình tùy chỉnh…");
  const result = await fileReplacer.runCustomReplace({ url, target });
  if (result.success) {
    console.log("✅ Thành công:", result.message);
  } else {
    console.log("❌ Thất bại:", result.message);
  }
  return result;
}

// Export cho Node.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = { FFFileReplacer, quickReplace, customReplace };
}

// Export cho browser
if (typeof window !== "undefined") {
  window.FFFileReplacer = FFFileReplacer;
  window.quickReplace = quickReplace;
  window.customReplace = customReplace;
}

// Gợi ý sử dụng
console.log("=== 🧠 FREE FIRE FILE REPLACER READY ===");
console.log("👉 Dùng: quickReplace() để chạy nhanh");
console.log("👉 Hoặc: customReplace('url', 'targetFile')");
console.log("📊 Trạng thái: fileReplacer.getStatus()");
