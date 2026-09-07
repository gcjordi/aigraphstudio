# Deploy AI Graph Studio to IONOS

For conventional shared web hosting. No Node.js, npm, PHP, database, Docker or SSH is required. The source files are also the ready-to-deploy static application.

## 1. Download and extract

Download `ai-graph-studio.zip` and extract it on your computer. Open the `ai-graph-studio` folder: it contains `index.html`, `assets`, `docs`, `examples` and project documentation. Upload the extracted files, not just the ZIP.

Open `START_HERE_EN.html` by double-clicking it to read the introductory guide. Documentation works locally. The application itself must be opened through HTTP/HTTPS; opening `index.html` directly may block JavaScript modules.

## 2. Sign in to IONOS

Select the hosting contract you want to use. Menu labels vary by contract and language. Look for **Hosting / Webspace** and **Domains & SSL**. Do not install WordPress or use a website builder for this application.

## 3. Choose a domain, subdomain or subdirectory

A dedicated subdomain such as `graphs.yourdomain.com` is convenient. Create it in domain management if necessary. A subdirectory such as `yourdomain.com/graphs/` also works.

Create an empty webspace folder, for example `ai-graph-studio`. Do not overwrite another website. For a dedicated domain or subdomain, connect its web destination to this webspace directory. This means selecting a directory, not setting a redirect to another URL.

For a subdirectory, create `graphs` inside the directory serving your existing website. Do not change the domain destination in this case.

## 4. Find webspace

Under **Hosting**, open **Use Webspace / Webspace Explorer**. Navigate to your chosen folder. If you have several contracts, check that the domain and webspace use the same one.

## 5. Upload files

**SFTP:** use the SFTP credentials provided by IONOS in a transfer client. Select the local contents of `ai-graph-studio` on one side and the remote destination on the other. Transfer all files and subdirectories, preserving the structure. This is convenient for the entire folder.

**Webspace Explorer:** open the destination folder, select **Upload**, choose files and confirm. If complete folder upload is unavailable, create `assets/css`, `assets/js`, `docs`, `examples` and `tests`, then upload the corresponding files into each folder. No terminal is needed.

The functional minimum is `index.html`, `assets`, and `docs` for linked guides. Keep the license and documentation as well. The `tests` folder is optional in production.

## 6. Check the directory structure

If the subdomain points to `/ai-graph-studio`, it should contain:

```text
/ai-graph-studio/index.html
/ai-graph-studio/assets/css/style.css
/ai-graph-studio/assets/js/app.js
/ai-graph-studio/docs/USER_GUIDE_EN.html
```

Avoid accidentally creating `/ai-graph-studio/ai-graph-studio/index.html` unless the domain explicitly points to that inner folder. The index belongs directly inside the selected web directory. Preserve lowercase filenames.

## 7. Enable HTTPS

Under **Domains & SSL**, select or configure a certificate for the domain/subdomain. Wait for activation, then open its `https://` address.

With Cloudflare, verify the origin certificate and avoid circular redirects. The package does not force HTTPS redirects because proxy configuration varies. Enable redirects through your domain/proxy after checking the certificate. Always use the same HTTPS address to access your local projects.

## 8. Optional `.htaccess`

The package includes an optional `.htaccess` with MIME types and protective headers. It has no account-specific paths or domain redirects. It is not required for the application logic.

If uploading it causes a **500** response, temporarily rename only this application's file to `htaccess-disabled.txt`. Some hosting plans restrict Apache directives. The basic security policy is also present in `index.html`. Do not replace another website's `.htaccess`; use a dedicated folder.

## 9. Test your installation

1. Open the HTTPS address and confirm that the editor appears in Catalan.
2. Follow or skip onboarding, then choose English in the language selector.
3. Open the research template. Select Analyze, then Simulate → Run simulation.
4. Save, reload and reopen the project through Local projects.
5. Export JSON and import it again to confirm graph preservation.
6. Export PNG and Markdown and check your downloads.
7. Try all languages and light/dark themes.

A private browsing window helps test a new visitor's experience, but should not be used for durable project storage.

## 10. Troubleshooting

| Symptom | Check |
| --- | --- |
| 404 or old website | Domain destination, directory and `index.html`. |
| Blank page or missing styles | All `assets` files, lowercase paths, then hard refresh. |
| MIME / JavaScript error | A `.js` URL must not return an HTML error page. Check its path and `.htaccess`. |
| 403 | Read permissions and index file; usually files 644 and directories 755 where configurable. |
| 500 | Disable only this application's `.htaccess` and check plan restrictions. |
| Redirect loop | HTTPS settings at both Cloudflare and IONOS. |
| Saving fails | Blocked IndexedDB, private mode or full storage. Export JSON immediately. |
| Projects are missing | Exact browser, profile, device and origin, including HTTP/HTTPS and www. |
| iPhone downloads | Check Files → Downloads or Safari's download manager. Keep the tab open until completion. |

## 11. Updating and rollback

Export important projects to JSON and back up the existing website files before updating. Upload the complete new version; do not mix modules from different versions. Keep the same domain, protocol and browser profile. Purge Cloudflare cache if used. To roll back, restore the complete previous version.

## 12. Backups and local data

**Replacing website files does not itself delete local projects.** Hosting contains the application; each visitor's browser stores their graphs in IndexedDB. Graphs are not stored on IONOS and cannot be backed up from the server.

Export important projects to JSON and keep those files in your own trusted location. Import them when moving to another browser, device or origin. Clearing browser data, losing the device, private browsing or storage eviction can remove the local copy. There is no device synchronization or account recovery.

## Official references

Checked on 6 September 2026; specific menu labels may vary.

- [Upload files](https://www.ionos.com/help/hosting/managing-webspace-with-webspace-explorer/uploading-a-file-using-webspace-explorer/)
- [Find webspace](https://www.ionos.com/help/hosting/using-php-for-web-projects/determining-the-absolute-path-document-root-of-your-webspace/)
- [Configure SSL](https://www.ionos.com/help/ssl-certificates/setting-up-ssl-certificates-managed-by-11-ionos/setting-up-an-ssl-certificate-managed-by-11-ionos-ssl-starter-ssl-starter-advanced-ssl-starter-wildcard/)
