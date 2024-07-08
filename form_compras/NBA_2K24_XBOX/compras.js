document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("purchaseForm");
    const mensagemPedido = document.getElementById("mensagemPedido");
    const overlay = document.querySelector(".overlay");
    let contadorPedidos = 0;

    // Mapeando os valores dos produtos
    const valoresProdutos = {
        "NBA 2K24 KOBE BRYANT EDITION": 69.99,
        "NBA 2K24 BLACK MAMBA EDITION": 99.99,
        "NBA 2K24 DELUXE EDITION": 119
    };

    const imagensProdutos = {
        "NBA 2K24 KOBE BRYANT EDITION": "NBA_2K24_XBOX.png",
        "NBA 2K24 BLACK MAMBA EDITION": "BlackM.png",
        "NBA 2K24 DELUXE EDITION": "DLX.png"
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
        extra.addEventListener("change", function () {
            calcularValorFinal();
            atualizarImagemProduto();
        });
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

        const valorProduto = valoresProdutos[produtoSelecionado] || 0;

        const extrasValue = Array.from(extras)
            .filter(extra => extra.checked)
            .reduce((total, extra) => total + parseFloat(extra.value), 0);

        const valorFinal = valorProduto + prazoEntrega + extrasValue;
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
                window.location.href = "index.html";
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

            // Adicionando o tamanho da imagem com base no produto selecionado
            switch (produtoSelecionado) {
                case "NBA 2K24 KOBE BRYANT EDITION":
                    imgElement.style.width = "100%";
                    imgElement.style.height = "auto";
                    break;
                case "NBA 2K24 BLACK MAMBA EDITION":
                    imgElement.style.width = "100%";
                    imgElement.style.height = "auto";
                    break;
                case "NBA 2K24 DELUXE EDITION":
                    imgElement.style.width = "100%";
                    imgElement.style.height = "auto";
                    break;
            }
        }
    }
});
