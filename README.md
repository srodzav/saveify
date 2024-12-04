# Saveify

This is a web application that integrates with the Spotify API, allowing users to search for songs, manage favorites, and view their Spotify profile.

---

## Features

- **Spotify OAuth Login**: Secure login using Spotify's API.
- **Song Search**: Search for songs and view details such as album covers and previews.
- **Favorites Management**: Add or remove songs from favorites (stored locally in the browser).
- **Profile Modal**: Displays user profile information (name, email, country, and profile picture) after login.

## Technologies Used

**React.js**
  - Core framework for building dynamic and responsive user interfaces
  - Utilized functional components with hooks (useState, useEffect) for state management and side effects.

**React-Bootstrap**
  - Simplified integration of Bootstrap's powerful components with React.
  - Styling and layout management for tables, modals, alerts, and buttons.

**Bootstrap Icons**
  - Used for icons, enhancing the UI with lightweight and consistent iconography.

# Deployment Instructions

**Development Environment**

  Tested locally with Node.js and React development tools.

  Built using
   ```
    npm run build
   ```

**Hosting**

  Static assets deployed to a custom subdomain using a secure hosting solution.

  Configured Redirect URIs to ensure seamless Spotify login integration.

## Usage

   Visit **saveify.sebastianrdz.com**.\
   Log in using your Spotify account.\
   Search for songs or manage your favorites.\
   View your profile in the modal after logging in.

## Notes

   The app requires a Spotify Developer account to configure the CLIENT_ID and CLIENT_SECRET.

## Author

**Sebastián Rodríguez**
- [LinkedIn](https://www.linkedin.com/in/sebastian-rodriguez-zavala/)
- [Web](https://sebastianrdz.com)
- [Email](mailto:contact@sebastianrdz.com)

---

## License

This project is for personal use and is not licensed for commercial distribution.
