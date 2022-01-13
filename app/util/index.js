export const getEntity = async (entity) => {
  try {
    const result = await fetch(`http://localhost:3000/${entity}`, {
      method: 'GET',
    });
    const data = await result.json();

    return data;
  } catch (err) {
    return err;
  }
};

export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
