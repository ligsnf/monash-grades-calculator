<a id="readme-top"></a>



<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stars][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![GNU GPLv3 License][license-shield]][license-url]



<!-- PROJECT LOGO -->
# Monash Grades Calculator

A simple calculator that helps Monash University students track their academic progress

> **:warning: This is not an official Monash University tool**

[Try it out](https://liangdi.dev/monash-grades-calculator/) ·
[Report Bug](https://github.com/ligsnf/monash-grades-calculator/issues/new?labels=bug) ·
[Request Feature](https://github.com/ligsnf/monash-grades-calculator/issues/new?labels=enhancement)



<!-- TABLE OF CONTENTS -->
<br />
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#why-this-calculator">Why This Calculator</a></li>
        <li><a href="#official-monash-references">Official Monash References</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#known-issues">Known Issues</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>
<br />



<!-- ABOUT THE PROJECT -->
## About The Project

Using Monash's official calculation methods, this calculator computes both your GPA and WAM in one place.

### Why This Calculator

The existing separate calculators for GPA and WAM require students to input their results multiple times. This calculator was created to provide a streamlined experience where you can:
- Calculate both GPA and WAM simultaneously
- Import results directly via CSV
- See calculations update in real-time

### Official Monash References

- [Results and Grades Legend](https://www.monash.edu/students/admin/assessments/results/results-legend)
- [GPA Calculation Method](https://www.monash.edu/students/admin/assessments/results/gpa)
- [WAM Calculation Method](https://www.monash.edu/students/admin/assessments/results/wam)

### Features

- Real-time GPA and WAM calculations
- CSV result import support
- Manual grade entry
- User-friendly interface
- Privacy-focused (all calculations performed locally)

### Built With

[![React][React.js]][React-url]
[![Vite][Vite.js]][Vite-url]
[![Tailwind][Tailwind.css]][Tailwind-url]
[![Shadcn/ui][Shadcn.ui]][Shadcn-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This guide will help you set up the app locally on your machine. Follow these simple steps to get a local copy up and running.

### Prerequisites

Make sure you have Node.js (version 20 or higher) installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

* npm (usually comes with Node.js)
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ligsnf/monash-grades-calculator
   ```
2. Navigate to the project directory
   ```sh
   cd monash-grades-calculator
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Start the development server
   ```sh
   npm run dev
   ```
5. Open your browser and navigate to the URL shown in the terminal (usually http://localhost:5173/monash-grades-calculator/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- Known Issues -->
## Known Issues

- Due to GitHub Pages hosting limitations, direct navigation to routes (e.g., /about) will trigger a 404 error. A redirect has been implemented to handle this by returning users to the homepage.
- In iOS Safari, the site icon may revert to a default letter when navigating between pages. This is a known Safari limitation with Single Page Applications (SPAs), affecting many web applications, and is not specific to this calculator.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Top contributors:

<a href="https://github.com/ligsnf/monash-grades-calculator/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ligsnf/monash-grades-calculator" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the GNU GPLv3 License. See [`LICENSE`](https://github.com/ligsnf/monash-grades-calculator/blob/main/LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/ligsnf/monash-grades-calculator.svg?style=for-the-badge
[contributors-url]: https://github.com/ligsnf/monash-grades-calculator/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ligsnf/monash-grades-calculator.svg?style=for-the-badge
[forks-url]: https://github.com/ligsnf/monash-grades-calculator/network/members
[stars-shield]: https://img.shields.io/github/stars/ligsnf/monash-grades-calculator.svg?style=for-the-badge
[stars-url]: https://github.com/ligsnf/monash-grades-calculator/stargazers
[issues-shield]: https://img.shields.io/github/issues/ligsnf/monash-grades-calculator.svg?style=for-the-badge
[issues-url]: https://github.com/ligsnf/monash-grades-calculator/issues
[license-shield]: https://img.shields.io/github/license/ligsnf/monash-grades-calculator.svg?style=for-the-badge
[license-url]: https://github.com/ligsnf/monash-grades-calculator/blob/main/LICENSE
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://react.dev/
[Vite.js]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD022
[Vite-url]: https://vite.dev/
[Tailwind.css]: https://img.shields.io/badge/Tailwind-0B1120?style=for-the-badge&logo=tailwind-css&logoColor=38BDF8
[Tailwind-url]: https://tailwindcss.com/
[Shadcn.ui]: https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white
[Shadcn-url]: https://ui.shadcn.com/
