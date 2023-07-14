

const base2 = 'https://mindicador.cl/api/';


const getValor = async (currency) => {

    const query = `${currency}/`;

    const response = await fetch(base2 + query);
    const data = await response.json();

    return data;

}
