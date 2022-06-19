# Adding or Removing an icon

## To generate the icon

1. Go to https://icomoon.io/app/
2. Click on "Import Icons", and click on "Import Icons"
3. Upload the icons.json present in the "/external/iconFonts"
4. Add or remove the icons listed below in the website
5. Do not select or deselect any icon except for the new/old ones
6. Click on "Generate font", you will be navigated to the next page where you will be able to see all the icons with total count on top, and icon with a "CODE"(for example : "e907").

## To make changes in application code

7. Copy the code of the newly added icon and paste it in the icons section in the icon-Fonts.scss in the application.
8. Once the above step is done, click on the download Font button at the bottom of the page.
9. "selection.json" file would be downloaded
10. Rename it to "icons.json" and replace it in the code under the /external and push to git
11. Once done, icons are available for usage
12. Icons would now be used as "chevrondown" for the name attribute of <Icon /> tag
