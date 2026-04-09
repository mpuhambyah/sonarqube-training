// ============================================================
// Utility functions
// ⚠️ SENGAJA BUGGY - Various code smells
// ============================================================

// Bug: eval usage
export function parseConfig(configString: any) {
  // 🔴 Security: eval is dangerous
  return eval("(" + configString + ")");
}

// Bug: Cognitive complexity, too many if-else
export function formatCurrency(amount: any, currency: any, locale: any) {
  if (currency === "USD") {
    if (locale === "en-US") {
      return "$" + amount.toFixed(2);
    } else if (locale === "en-GB") {
      return "$" + amount.toFixed(2);
    } else {
      return "$" + amount.toFixed(2);
    }
  } else if (currency === "EUR") {
    if (locale === "de-DE") {
      return amount.toFixed(2) + "€";
    } else if (locale === "fr-FR") {
      return amount.toFixed(2) + " €";
    } else {
      return "€" + amount.toFixed(2);
    }
  } else if (currency === "IDR") {
    if (locale === "id-ID") {
      return "Rp " + amount.toFixed(0);
    } else {
      return "IDR " + amount.toFixed(0);
    }
  } else if (currency === "JPY") {
    return "¥" + amount.toFixed(0);
  } else if (currency === "GBP") {
    return "£" + amount.toFixed(2);
  } else {
    return amount.toFixed(2) + " " + currency;
  }
}

// Bug: Duplicated string literals
export function getStatusMessage(code: any) {
  if (code === 200) return "Success";
  if (code === 201) return "Created";
  if (code === 400) return "Bad Request";
  if (code === 401) return "Unauthorized";
  if (code === 403) return "Forbidden";
  if (code === 404) return "Not Found";
  if (code === 500) return "Internal Server Error";
  if (code === 502) return "Bad Gateway";
  if (code === 503) return "Service Unavailable";
  return "Unknown Status";
}

// Bug: Function that does nothing useful
export function processData(data: any) {
  let result = data;
  result = result;
  return result;
}

// Bug: Commented-out code left behind
// export function oldFormatDate(date: any) {
//   const d = new Date(date);
//   return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
// }

// export function anotherOldFunction() {
//   console.log("this is old");
//   return null;
// }

// Bug: TODO left in code
// TODO: implement proper logging
// FIXME: this is a temporary hack
// HACK: remove this before production
export function log(message: any) {
  console.log(new Date().toISOString() + " - " + message);
}
