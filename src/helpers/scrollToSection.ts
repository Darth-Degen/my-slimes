export const scrollToSection = (id: string): void => {
  const yOffset = 0; // adjust for fixed header
  const element = document.getElementById(id);
  if (!element) return;
  const y = element!.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
};
