# SonarQube Training - Sample Buggy Project

⚠️ **Project ini SENGAJA berisi banyak bug dan bad practice!**

Project ini digunakan sebagai bahan latihan scanning SonarQube dalam workshop training.

## Jenis Issue yang Sengaja Ditanam

### 🔴 Vulnerabilities (Security)
- SQL Injection (string concatenation in queries)
- Hardcoded credentials & API keys
- XSS (Cross-Site Scripting)
- Weak encryption (DES)
- Insecure random number generation
- Admin backdoor token
- Password in JWT payload
- `eval()` usage

### 🐛 Bugs
- Null dereference
- Unreachable code (code after return)
- Infinite loop potential
- Connection leak (DB connection not closed)
- Comparison always false (`price !== price`)
- Empty catch block (error swallowed)

### 💩 Code Smells
- `any` type everywhere
- God functions (too long/complex)
- High cognitive complexity (deeply nested ifs)
- Code duplication (copy-paste functions)
- Dead code & unused variables
- Magic numbers
- Long parameter lists
- console.log in production
- TODO/FIXME/HACK comments
- Commented-out code blocks

## Cara Pakai

```bash
# 1. Install dependencies
npm install

# 2. Scan dengan SonarQube
npx sonar-scanner \
  -Dsonar.host.url=http://YOUR_SONARQUBE_URL:9000 \
  -Dsonar.token=YOUR_TOKEN
```

## Expected SonarQube Results

Setelah scan, diharapkan muncul:
- **Bugs:** 5-10
- **Vulnerabilities:** 10-15
- **Security Hotspots:** 5-10
- **Code Smells:** 30-50
- **Duplication:** 10-20%
- **Quality Gate:** ❌ FAILED
