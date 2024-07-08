document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("purchaseForm");
    const mensagemPedido = document.getElementById("mensagemPedido");
    const overlay = document.querySelector(".overlay");
    let contadorPedidos = 0;

    // Mapeando os valores dos produtos
    const valoresProdutos = {
        "PlayStation 5 (1TB)": 449,
        "PlayStation 5 (2TB)": 489.99,
        "PlayStation 5 (4TB)": 500
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
    produtoSelect.addEventListener("change", calcularValorFinal);

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
});
