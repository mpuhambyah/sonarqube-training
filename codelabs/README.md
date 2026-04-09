# SonarQube Training Workshop - Codelabs

Interactive training material menggunakan format [Google Codelabs](https://github.com/googlecodelabs/tools).

## Quick Start

### 1. Install `claat` (Codelabs command-line tool)

**Windows:**
```powershell
# Download binary dari GitHub releases
Invoke-WebRequest -Uri "https://github.com/googlecodelabs/tools/releases/download/v2.2.6/claat-windows-amd64.exe" -OutFile "claat.exe"

# Atau jika punya Go:
go install github.com/googlecodelabs/tools/claat@latest
```

**macOS:**
```bash
brew install claat
# Atau:
go install github.com/googlecodelabs/tools/claat@latest
```

**Linux:**
```bash
curl -L https://github.com/googlecodelabs/tools/releases/download/v2.2.6/claat-linux-amd64 -o claat
chmod +x claat
sudo mv claat /usr/local/bin/
```

### 2. Export & Preview

```bash
cd codelabs

# Export markdown ke HTML
claat export sonarqube-training.md

# Serve secara lokal (buka browser otomatis)
claat serve
```

Buka `http://localhost:9090` → klik codelab untuk preview.

### 3. Deploy ke Hosting

Output dari `claat export` adalah folder HTML statis. Bisa di-deploy ke:

- **GitHub Pages**
- **Azure Static Web Apps**
- **Netlify**
- **Nginx / Apache**

#### Deploy ke GitHub Pages

```bash
# Export
claat export sonarqube-training.md

# Copy output ke branch gh-pages atau push ke repo
# Output folder: sonarqube-training/
```

#### Deploy ke Azure Static Web Apps

```bash
# Export
claat export sonarqube-training.md

# Upload folder output ke Azure Blob Storage (Static Website)
az storage blob upload-batch \
  --account-name YOUR_ACCOUNT \
  --destination '$web' \
  --source sonarqube-training/
```

## Struktur File

```
codelabs/
├── sonarqube-training.md    # Source markdown (edit ini)
├── img/                     # Gambar & screenshot
│   └── sonarqube-logo.png
└── sonarqube-training/      # Output HTML (generated, jangan edit)
    └── index.html
```

## Tips Edit Konten

- Edit file `sonarqube-training.md`
- Setiap `## Heading` = 1 step di sidebar
- `Duration: X:00` menentukan estimasi waktu per step
- `Positive :` = info box hijau (tips)
- `Negative :` = info box orange (warning)
- Preview dengan `claat serve` setelah edit

## Menambah Gambar

1. Simpan gambar ke folder `img/`
2. Referensikan di markdown: `![Alt text](img/nama-file.png)`
3. Re-export: `claat export sonarqube-training.md`
