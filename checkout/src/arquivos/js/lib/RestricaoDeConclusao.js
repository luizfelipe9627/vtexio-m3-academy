import Evento from "./Evento";

var RestricaoDeConculsao = function (funcaoDeAvaliacao, mensagemDeErro) {
    var _this = this,
        _regraAtiva = true,
        _mensagemDeErro;

    var eventos = {
        tentativaDeFinalizacao: new Evento(),
        aplicavel: new Evento(),
        naoAplicavel: new Evento(),
    };
    _this.on = function (evento, fn) {
        if (Reflect.has(eventos, evento)) {
            eventos[evento].subscribe(fn);
        }
    };
    _this.off = function (evento, fn) {
        if (Reflect.has(eventos, evento)) {
            eventos[evento].unsubscribe(fn);
        }
    };
    _this.mensagemDeErro = function (
        mensagemDeErro = "Forneca as informações para finalizar a compra"
    ) {
        if (mensagemDeErro) _mensagemDeErro = mensagemDeErro;
        return _mensagemDeErro;
    };

    _this.inicializar = function configurarEventos() {
        $(window).on("orderFormUpdated.vtex", atualizacaoDoPedido);
        window.vtexjs.checkout.getOrderForm();
    };

    function feedback(tipo, titulo, detalhe) {
        var message = {
            content: {
                title: titulo,
                detail: detalhe,
            },
            type: tipo,
        };
        if ("undefined" != typeof $) {
            $(window).trigger("addMessage", message);
        } else {
            console.warn("Erro ao acionar front-messages-ui");
        }
    }

    function clickBtnDesabilitado(event) {
        event.preventDefault();
        feedback("warning", "Erro ", _mensagemDeErro);
        eventos.tentativaDeFinalizacao.fire();
    }

    function aplicavel(alternativa) {
        // se a regra estiver desativada não sera aplicada
        alternativa = alternativa && _regraAtiva;
        var evento = alternativa ? "aplicavel" : "naoAplicavel";
        eventos[evento].fire();
        ativacao(alternativa);
    }

    function ativacao(alternativa) {
        var $btnContainer = $(".payment-submit-wrap,.payment-submit-hide");
        var btns = $btnContainer.find("button");

        btns.each(function (i, el) {
            $(el).toggleClass("btn-warning", alternativa);
        });

        if (!alternativa) {
            $btnContainer.off("click", clickBtnDesabilitado);
        } else {
            $btnContainer.on("click", clickBtnDesabilitado);
        }
    }

    _this.ativar = function () {
        _regraAtiva = true;
        ativacao(_regraAtiva);
    };
    _this.desativar = function () {
        _regraAtiva = false;
        ativacao(_regraAtiva);
    };

    function atualizacaoDoPedido(event, orderform) {
        var ehAplicavel = funcaoDeAvaliacao.call(funcaoDeAvaliacao, orderform);
        if (typeof ehAplicavel === "boolean") {
            aplicavel(ehAplicavel);
        } else {
            aplicavel(false);
            console.error(
                "função de avaliação retornando resultado indefinido.\n",
                ehAplicavel
            );
        }
    }

    _this.mensagemDeErro(mensagemDeErro);
    _this.inicializar();
};

export default RestricaoDeConculsao;
