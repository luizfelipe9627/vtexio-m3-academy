// Está importando a biblioteca do React.
import React, { useEffect, useState } from "react";

// Está importando o estilo.
import styles from "./styles.css";

// Está importando a imagem.
import clockIcon from "./assets/clock.svg";

// Interface definindo o tipo de data final em string.c
interface CountdownProps {
    // Criada para seguir a data e hora final(passada).
    // Formato -> dd/mm/yyyy/hh:mm
    endDate: string;
}

// Interface definindo o tipo do tempo em numbers.
interface Time {
    hour: number;
    minute: number;
    second: number;
}

// Recebe dentro do componente as propriedades da interface.
const Countdown = ({ endDate }: CountdownProps) => {
    // Armazena o valor do contador a cada estado de mudança.
    const [time, setTime] = useState<Time>({
        // Está setando os valores iniciais dos elementos.
        hour: 0,
        minute: 0,
        second: 0,
    });

    // Armazena a data e a hora em uma array, em seguida pega o endDate converte para string e separa seus elementos por "/".
    const [day, month, year, hourMinute] = endDate.split("/");

    // Armazena a hora e o minuto em uma array, em seguida pega o hourMinute converte para string e separa seus elementos por ":".
    const [hour, minute] = hourMinute.split(":");

    // Função responsável por atualizar o contador.
    const updateTimer = () => {
        // Cria uma constante que recebe um objeto em formato de data.
        const finalDate = new Date(
            // O Date recebe numbers, e como nossos valores são strings, tem que ser convertidos para numbers.
            parseInt(year),
            parseInt(month) - 1,
            parseInt(day),
            parseInt(hour),
            parseInt(minute)
            // O getTime retorna o tempo em milissegundos.
        ).getTime();

        // Constante responsável por armazenar a data atual.
        const atualDate = new Date().getTime();

        // Armazena a diferença entre as duas datas.
        let difference = finalDate - atualDate;

        // A variável differece está recebendo em milissegundos, para calcular em horas dividimos por 1000 o que resulta em segundos, depois multiplica por 60 para calcular em minutos e por fim multiplica eles todos para calcular em horas.
        // O math.floor pega o numero e arredonda ele para baixo, fazendo ele ficar inteiro.
        const hours = Math.floor(difference / (1000 * 60 * 60));

        // Calcula horas em milissegundos.
        difference = difference - hours * 60 * 60 * 1000;

        // Calcula horas em minutos.
        const minutes = Math.floor(difference / (1000 * 60));

        difference = difference - minutes * 60 * 1000;

        // Calcula minutos em segundos.
        const seconds = Math.floor(difference / 1000);

        // Caso a data final ja tenha sido ultrapassada executa o bloco de comandos.
        if (hours <= 0) {
            // Dentro do setTime que é quem altera os valores do useState, zera todos os valores.
            setTime({
                hour: 0,
                minute: 0,
                second: 0,
            });
        } else {
            // Dentro do setTime que é quem altera os valores do useState, recebe todos os valores.
            setTime({
                hour: hours,
                minute: minutes,
                second: seconds,
            });
        }
    };

    // toString transforma em string. padStart é usado para dizer qual o número mínimo de caracteres e o que vai completar caso não tenho o número mínimo.
    const hoursString = time.hour.toString().padStart(2, "0");
    const minuteString = time.minute.toString().padStart(2, "0");
    const secondString = time.second.toString().padStart(2, "0");

    // É chamado quando o componente for renderizado.
    useEffect(() => {
        // Executa a função updateTimer a cada 1 milissegundo.
        setInterval(updateTimer, 1000);
    }, []);

    // Está atribuindo a div uma classe chamada CountdownWrapper.
    return (
        <div className={styles["Countdown"]}>
            <div className={styles["CountdownWrapper"]}>
                <div className={styles["CountdownBadge"]}>
                    <img src={clockIcon} alt="Relógio" />
                </div>

                <div className={styles["CountdownTitle"]}>
                    <h1 className={styles["CountdownTitleH1"]}>ofertas</h1>
                    <h3 className={styles["CountdownTitleH3"]}>
                        Não perca tempo,
                    </h3>
                    <h2 className={styles["CountdownTitleH2"]}>
                        garanta agora
                    </h2>
                </div>

                <div className={styles["CountdownText"]}>
                    {` ${hoursString}:${minuteString}:${secondString}`}
                </div>
            </div>
        </div>
    );
};

// Exporta o arquivo para ser usado em outros escopos.
export default Countdown;

// Para o componente ser editavel pelo Site Editor precisa declarar uma schema.
Countdown.schema = {
    // Titulo do schema.
    title: "Countdown Academy",
    // O tipo do schema, no caso o tipo que ele irá receber.
    type: "object",
    // Declara todas propriedades que ele recebe.
    properties: {
        endDate: {
            // Titulo da propriedade.
            title: "Data final de Countdown",
            // O tipo da propriedade.
            type: "string",
            // Um valor default para a propriedade.
            default : "27/01/2023/00:00"
        }
    }
};
