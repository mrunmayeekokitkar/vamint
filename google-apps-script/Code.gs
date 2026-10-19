/**
 * ============================================================================
 * VAMINT - Google Apps Script Web App Endpoint
 * Handles:
 *  1. Pitch Perfect Registrations (formType: "pitchPerfect") -> Tab: "PitchPerfect"
 *  2. Club Applications (formType: "club")                 -> Tab: "ClubApplications"
 *  3. Committee Applications (formType: "committee")       -> Tab: "CommitteeApplications"
 * ============================================================================
 */

// Replace with your secret key configured in .env (FORM_SECRET_KEY)
var SECRET_KEY = "your_form_secret_key_here";

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return responseJson({ status: "error", message: "No data received" }, 400);
    }

    var data = JSON.parse(e.postData.contents);

    // 1. Verify Secret Key (optional security check if configured)
    if (SECRET_KEY && SECRET_KEY !== "your_form_secret_key_here") {
      if (!data.secretKey || data.secretKey !== SECRET_KEY) {
        return responseJson({ status: "error", message: "Unauthorized request" }, 401);
      }
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var formType = data.formType;

    // ─── 1. PITCH PERFECT REGISTRATION ──────────────────────────────────────
    if (formType === "pitchPerfect") {
      var sheetName = "PitchPerfect";
      var sheet = ss.getSheetByName(sheetName);

      // Create sheet tab if it doesn't exist
      if (!sheet) {
        sheet = ss.insertSheet(sheetName);
      }

      // Check and add headers if the sheet is newly created / empty
      if (sheet.getLastRow() === 0) {
        var headers = [
          "Timestamp",
          "Team Name",
          "Team Size",
          "Total Fee (₹)",
          "P1 Name",
          "P1 Email",
          "P1 Phone",
          "P1 College",
          "P1 Department",
          "P1 Year",
          "P2 Name",
          "P2 Email",
          "P2 Phone",
          "P2 College",
          "P2 Department",
          "P2 Year",
          "P3 Name",
          "P3 Email",
          "P3 Phone",
          "P3 College",
          "P3 Department",
          "P3 Year",
          "Payment Screenshot URL"
        ];
        sheet.appendRow(headers);
        var headerRange = sheet.getRange(1, 1, 1, headers.length);
        headerRange.setFontWeight("bold");
        headerRange.setBackground("#111827");
        headerRange.setFontColor("#5eead4"); // Mint accent
        sheet.setFrozenRows(1);
      }

      // Handle Payment Screenshot Upload to Google Drive
      var screenshotUrl = "Not uploaded";
      if (data.paymentScreenshot && typeof data.paymentScreenshot === "string") {
        if (data.paymentScreenshot.indexOf("base64,") !== -1) {
          try {
            var parts = data.paymentScreenshot.split("base64,");
            var meta = parts[0];
            var base64Content = parts[1];
            var mimeMatch = meta.match(/data:([^;]+);/);
            var mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";
            var ext = mimeType.indexOf("png") !== -1 ? ".png" : (mimeType.indexOf("webp") !== -1 ? ".webp" : ".jpg");
            var cleanTeamName = (data.teamName || "Team").replace(/[^a-zA-Z0-9_-]/g, "_");
            var fileName = cleanTeamName + "_payment_" + new Date().getTime() + ext;

            var decodedBytes = Utilities.base64Decode(base64Content);
            var blob = Utilities.newBlob(decodedBytes, mimeType, fileName);

            // Get or create Drive folder "Pitch Perfect Payments"
            var folderName = "Pitch Perfect Payments";
            var folders = DriveApp.getFoldersByName(folderName);
            var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);
            var driveFile = folder.createFile(blob);
            driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
            screenshotUrl = driveFile.getUrl();
          } catch (uploadErr) {
            screenshotUrl = "Drive upload error: " + uploadErr.toString();
          }
        } else {
          screenshotUrl = data.paymentScreenshot;
        }
      }

      var totalFee = data.totalAmount || (Number(data.teamSize || 1) * 50);

      // Append row
      sheet.appendRow([
        new Date(),
        data.teamName || "",
        data.teamSize || 1,
        totalFee,
        data.p1Name || "",
        data.p1Email || "",
        data.p1Phone || "",
        data.p1College || "",
        data.p1Department || "",
        data.p1Year || "",
        data.p2Name || "",
        data.p2Email || "",
        data.p2Phone || "",
        data.p2College || "",
        data.p2Department || "",
        data.p2Year || "",
        data.p3Name || "",
        data.p3Email || "",
        data.p3Phone || "",
        data.p3College || "",
        data.p3Department || "",
        data.p3Year || "",
        screenshotUrl
      ]);

      return responseJson({
        status: "success",
        message: "Pitch Perfect team registration recorded successfully!",
        screenshotUrl: screenshotUrl
      });
    }

    // ─── 2. CLUB MEMBERSHIP APPLICATION ────────────────────────────────────
    if (formType === "club") {
      var clubSheet = ss.getSheetByName("ClubApplications") || ss.getSheetByName("Sheet1");
      if (!clubSheet) clubSheet = ss.insertSheet("ClubApplications");

      if (clubSheet.getLastRow() === 0) {
        var clubHeaders = ["Timestamp", "Full Name", "Email", "Phone", "Academic Year", "Department"];
        clubSheet.appendRow(clubHeaders);
        clubSheet.getRange(1, 1, 1, clubHeaders.length).setFontWeight("bold");
        clubSheet.setFrozenRows(1);
      }

      clubSheet.appendRow([
        new Date(),
        data.name || "",
        data.email || "",
        data.phone || "",
        data.year || "",
        data.department || ""
      ]);

      return responseJson({ status: "success", message: "Club application recorded" });
    }

    // ─── 3. COMMITTEE APPLICATION ──────────────────────────────────────────
    if (formType === "committee") {
      var commSheet = ss.getSheetByName("CommitteeApplications");
      if (!commSheet) commSheet = ss.insertSheet("CommitteeApplications");

      if (commSheet.getLastRow() === 0) {
        var commHeaders = ["Timestamp", "Full Name", "Email", "Phone", "Academic Year", "Department", "Preferred Areas", "Experience / Statement"];
        commSheet.appendRow(commHeaders);
        commSheet.getRange(1, 1, 1, commHeaders.length).setFontWeight("bold");
        commSheet.setFrozenRows(1);
      }

      commSheet.appendRow([
        new Date(),
        data.name || "",
        data.email || "",
        data.phone || "",
        data.year || "",
        data.department || "",
        data.preferredArea || "",
        data.statement || ""
      ]);

      return responseJson({ status: "success", message: "Committee application recorded" });
    }

    return responseJson({ status: "error", message: "Unknown formType: " + formType }, 400);

  } catch (error) {
    return responseJson({ status: "error", message: error.toString() }, 500);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("VAMINT Google Apps Script Web App is active and running.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function responseJson(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
