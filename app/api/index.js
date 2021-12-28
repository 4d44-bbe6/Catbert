export async function getScales() {
  console.log('getScales')
  try {
    let res = await fetch('http://localhost:3000/scales/', {
      method: 'GET',
    });
    let scales = await res.json();
    console.log(scales);
    return scales
  } catch (err) {
    console.error(err)
  }
}