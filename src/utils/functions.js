export const currencyFormat = (text) => {
    return 'Rp. ' + text.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export const backToPrevious = async() =>{    
    window.history.back();
}

export const urlApi = "http://localhost:3000";