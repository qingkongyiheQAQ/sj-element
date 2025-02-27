export default function () {
  if (PROD) {
    const logo = `
__________________________________________________________________________________________________________
  _________     ____.         ___________.____     ___________   _____   ___________ _______ ___________
 /   _____/    |    |         \_   _____/|    |    \_   _____/  /     \  \_   _____/ \      \\__    ___/
 \_____  \     |    |  ______  |    __)_ |    |     |    __)_  /  \ /  \  |    __)_  /   |   \ |    |
 /        \/\__|    | /_____/  |        \|    |___  |        \/    Y    \ |        \/    |    \|    |
/_______  /\________|         /_______  /|_______ \/_______  /\____|__  //_______  /\____|__  /|____|
        \/                            \/         \/        \/         \/         \/         \/
__________________________________________________________________________________________________________
                               author:SJ
`;

    const rainbowGradient = `
background: linear-gradient(135deg, orange 60%, cyan);
background-clip: text;
color: transparent;
font-size: 16px; 
line-height: 1;
font-family: monospace;
font-weight: 600;
`;

    console.info(`%c${logo}`, rainbowGradient);
  } else if (DEV) {
    console.log("[Sj-element]:dev mode...");
  }
}
