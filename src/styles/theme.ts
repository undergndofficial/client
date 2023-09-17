interface MyTheme {
  device: {
    phone: string;
    tablet: string;
    laptop: string;
    laptopL: string;
    desktop: string;
  };
}

const sizes = {
  phone: '479px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '1920px',
};

const device = {
  phone: `(max-width: ${sizes.phone})`,
  tablet: `(min-width: ${sizes.phone}) and (max-width: ${sizes.tablet})`,
  laptop: `(min-width: ${sizes.tablet}) and (max-width: ${sizes.laptop})`,
  laptopL: `(min-width: ${sizes.laptop}) and (max-width: ${sizes.laptopL})`,
  desktop: `(min-width: ${sizes.desktop})`,
};

const theme: MyTheme = {
  device,
};

export default theme;
