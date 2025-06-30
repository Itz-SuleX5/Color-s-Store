const UseWhatsappLink = (product) => {
        const phone = "+50368545567";
        const message = `Hola, estoy interesado en ${product.title} con precio de $${product.price}`;
        const url = `https://wa.me/${phone.replace("+", "")}?text=${encodeURIComponent(message)}`;
        return url
    };

export default UseWhatsappLink;