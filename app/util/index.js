export async function getScales() {
  try {
    const res = await fetch('http://localhost:3000/scales/', {
      method: 'GET',
    });
    const scales = await res.json();
    return scales;
  } catch (err) {
    return err;
  }
}

export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
