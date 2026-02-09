# Deployment Guide for Dangus Mods

This guide explains how to deploy your website to GitHub Pages and host mod files for download.

## Part 1: Setting Up GitHub Repository

### 1. Create a GitHub Repository

1. Go to https://github.com/new
2. Name your repository (e.g., `dangus-mods`)
3. Make it **Public** (required for GitHub Pages on free accounts)
4. **Do NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

### 2. Push Your Code to GitHub

In your terminal, run these commands from the project root:

```bash
cd "/Users/jonah/Library/CloudStorage/GoogleDrive-jonahhicklin2@gmail.com/Other computers/My Computer/MIDWEST PATRIOT/Dangus Mods"

# Add all files to git
git add .

# Create your first commit
git commit -m "Initial commit: Dangus Mods website"

# Add your GitHub repository as remote (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Configure Vite Base Path

**IMPORTANT**: In [dev-server/vite.config.js](dev-server/vite.config.js), update the `base` path to match your repository name:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/YOUR_REPO_NAME/', // e.g., '/dangus-mods/'
})
```

If you change this, commit and push again:
```bash
git add dev-server/vite.config.js
git commit -m "Update base path for GitHub Pages"
git push
```

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
5. The workflow will automatically run and deploy your site

### 5. Wait for Deployment

1. Go to the **Actions** tab in your repository
2. You should see a "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (usually 2-3 minutes)
4. Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Part 2: Hosting Mod Files via GitHub Releases

GitHub Releases provide free file hosting perfect for distributing mod files.

### Creating a Release with Mod Files

1. **Go to your repository** on GitHub
2. Click **Releases** (right sidebar)
3. Click **Create a new release**

4. **Fill in the release details**:
   - **Tag version**: `v1.0.0` (or whatever version)
   - **Release title**: `Gag Order v1.0.0 for MC 1.21.10-1.21.11`
   - **Description**: Add changelog and mod details

5. **Upload your mod files**:
   - Drag and drop your `.jar` files into the "Attach binaries" section
   - For example: `gagorder-1.21.10-1.0.jar` and `gagorder-1.21.11-1.0.jar`

6. Click **Publish release**

### Getting Download URLs

After publishing, each file will have a download URL like:
```
https://github.com/YOUR_USERNAME/YOUR_REPO/releases/download/v1.0.0/gagorder-1.21.10-1.0.jar
```

### Updating Your Website with Download URLs

1. Open [dev-server/src/dangus-mods.jsx](dev-server/src/dangus-mods.jsx)
2. Find the `MODS` array at the top
3. Update the `downloadUrl` fields with your GitHub Release URLs:

```javascript
versions: [
  {
    gameVersion: "1.21.10",
    modVersion: "1.0",
    fileName: "gagorder-1.21.10-1.0",
    downloadUrl: "https://github.com/YOUR_USERNAME/YOUR_REPO/releases/download/v1.0.0/gagorder-1.21.10-1.0.jar",
    date: "Feb 8, 2026",
    changelog: [
      "Initial release of Gag Order for Minecraft 1.21.10"
    ]
  },
  // ... more versions
]
```

4. Commit and push changes:
```bash
git add dev-server/src/dangus-mods.jsx
git commit -m "Add download URLs for Gag Order mod"
git push
```

The GitHub Action will automatically rebuild and deploy your updated site!

## Updating Your Site

Every time you push to the `main` branch, GitHub Actions will automatically:
1. Build your site
2. Deploy to GitHub Pages
3. Your changes go live in 2-3 minutes

## Tips

- **Test locally first**: Run `npm run dev` in the `dev-server` folder before pushing
- **Check build**: Run `npm run build` locally to make sure it builds successfully
- **Release naming**: Use semantic versioning for releases (v1.0.0, v1.1.0, etc.)
- **Multiple mods**: Create separate releases for each mod, or include multiple files in one release
- **Pre-releases**: Use GitHub's "pre-release" checkbox for beta versions

## Troubleshooting

### Site shows 404 or blank page
- Check that `base` in `vite.config.js` matches your repo name exactly
- Make sure GitHub Pages is enabled in repository Settings > Pages
- Wait a few minutes after pushing for deployment to complete

### Workflow fails
- Check the Actions tab for error details
- Make sure `package-lock.json` exists in the `dev-server` folder
- Verify all dependencies install correctly with `npm ci` locally

### Download links broken
- Double-check the release URL format
- Make sure the release is published (not draft)
- Verify file names match exactly (including `.jar` extension)
