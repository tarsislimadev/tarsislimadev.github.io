export const domain = (domain) =>fetch(`https://rdap.org/domain/${domain}`).then((res) => res.json())
