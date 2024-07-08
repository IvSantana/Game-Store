document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("purchaseForm");
    const mensagemPedido = document.getElementById("mensagemPedido");
    const overlay = document.querySelector(".overlay");
    let contadorPedidos = 0;


    const valoresProdutos = {
        "MANDO BLANCO": 106.57,
        "MANDO ROJO": 106.57,
        "MANDO NEGRO": 340.99,
    };

    const imagensProdutos = {
        "MANDO BLANCO": "XBOX_MANDO.png",
        "MANDO ROJO": "ROJO.png",
        "MANDO NEGRO": "Mando_Negro.png"
    };

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        calcularValorFinal();

        if (contadorPedidos === 0) {
            exibirMensagemPedido();
        } else {
            exibirMensagemPedidoCaminho();
        }

        mostrarPopup();
        contadorPedidos++;
    });

    const extras = document.querySelectorAll("input[name^='extra']");

    extras.forEach(function (extra) {
        extra.addEventListener("change", calcularValorFinal);
    });

    const produtoSelect = document.getElementById("produto");
    produtoSelect.addEventListener("change", function () {
        calcularValorFinal();
        atualizarImagemProduto();
    });

    calcularValorFinal();

    function calcularValorFinal() {
        const prazoEntrega = parseFloat(document.getElementById("prazoEntrega").value) || 0;
        const produtoSelecionado = produtoSelect.value;

        // Adicionando o valor do produto selecionado
        const valorProduto = valoresProdutos[produtoSelecionado] || 0;

        const extrasValue = Array.from(extras)
            .filter(extra => extra.checked)
            .reduce((total, extra) => total + parseFloat(extra.value), 0);

        const valorFinal = valorProduto +  + extrasValue;
        document.getElementById("valorFinal").textContent = "€" + valorFinal.toFixed(2);
    }

    function exibirMensagemPedido() {
        const produtoSelecionado = produtoSelect.value;
        const prazoEntrega = document.getElementById("prazoEntrega").value;
        const endereco = document.getElementById("direccion").value;

        mensagemPedido.textContent = `Pedido enviado a ${endereco}! Has comprado el producto ${produtoSelecionado} y será entregado en ${prazoEntrega} días.`;
    }

    function exibirMensagemPedidoCaminho() {
        mensagemPedido.textContent = "Seu pedido já está a caminho!";
    }

    function mostrarPopup() {
        mensagemPedido.style.display = "block";
        overlay.style.display = "block";

        setTimeout(function () {
            mensagemPedido.style.opacity = "1";
            overlay.style.opacity = "1";
            mensagemPedido.style.transform = "translate(-50%, -50%) scale(1)";
        }, 50);

        setTimeout(function () {
            mensagemPedido.style.opacity = "0";
            overlay.style.opacity = "0";
            mensagemPedido.style.transform = "translate(-50%, -50%) scale(0.7)";
            setTimeout(function () {
                mensagemPedido.style.display = "none";
                overlay.style.display = "none";

                // Redirecionar para o index após o desaparecimento da mensagem
                window.location.href = "";
            }, 500);
        }, 5000);
    }
    function atualizarImagemProduto() {
        const produtoSelecionado = produtoSelect.value;
        const imagemProduto = imagensProdutos[produtoSelecionado];
        const imgElement = document.querySelector(".img-p");

        if (imagemProduto) {
            imgElement.src = imagemProduto;
            imgElement.alt = produtoSelecionado;
        }
        if (produtoSelecionado === "MANDO BLANCO") {
            
            imgElement.style.width = "100%";  
            imgElement.style.height = "auto"; 
       
        
        } else if (produtoSelecionado === "MANDO ROJO") {
        
            imgElement.style.width = "100%";  
            imgElement.style.height = "auto"; 
            
        } else if (produtoSelecionado === "MANDO NEGRO") {
        
            imgElement.style.width = "100%";  
            imgElement.style.height = "auto"; 
           
        }
    }
});
