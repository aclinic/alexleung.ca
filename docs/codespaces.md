# Codespaces Notes

Machine profile used for these notes:

- GitHub Codespaces container on Ubuntu 24.04
- Node.js `v24.11.1`
- Corepack `0.34.2`
- Yarn `4.12.0`

## Lighthouse in Codespaces

### Symptom

`yarn perf:lighthouse` fails during LHCI healthcheck with:

- `Chrome installation not found`

After adding a Chrome binary, it can still fail with shared library errors such as:

- `error while loading shared libraries: libatk-1.0.so.0: cannot open shared object file`

### Cause

- Ubuntu Codespaces image does not include a Chrome/Chromium binary by default.
- The container also does not include all desktop libraries required by headless Chrome.

### One-time setup

Install required runtime libraries:

```bash
sudo apt-get install -y --no-install-recommends \
  libatk1.0-0t64 libatk-bridge2.0-0t64 libcups2t64 libxkbcommon0 \
  libatspi2.0-0t64 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 \
  libgbm1 libasound2t64
```

Install Chrome for Testing into workspace-local cache:

```bash
yarn dlx @puppeteer/browsers install chrome@stable --path ./.cache/puppeteer-browsers
```

Point Lighthouse CI to the installed binary:

```bash
export CHROME_PATH="$(ls -1d .cache/puppeteer-browsers/chrome/linux-*/chrome-linux64/chrome | tail -n1)"
```

Run performance checks:

```bash
yarn build
yarn perf:lighthouse
```

### Optional: persist `CHROME_PATH`

```bash
echo 'export CHROME_PATH="$(ls -1d /workspaces/alexleung.ca/.cache/puppeteer-browsers/chrome/linux-*/chrome-linux64/chrome | tail -n1)"' >> ~/.bashrc
```

Open a new terminal (or `source ~/.bashrc`) afterward.
