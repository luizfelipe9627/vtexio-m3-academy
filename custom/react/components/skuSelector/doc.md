# Sku Selector

## Dependências

## SkuSelectorContext

### State

Exemplo do estado do contexto do sku selector

```ts
    {
        skus: [
            {
                id: "1",
                name: "blusa preta g",
                price: 12345,
                maxAvailable: 7,
                variants: [
                    {
                        name: "cor",
                        value: "preto"
                    }
                    {
                        name: "tamanho",
                        value: "G"
                    }
                ]
            }
            {
                id: "2",
                name: "blusa preta m",
                price: 12345,
                maxAvailable: 7,
                variants: [
                    {
                        name: "cor",
                        value: "preto"
                    }
                    {
                        name: "tamanho",
                        value: "G"
                    }
                ]
            }
            ...
        ],
        variants: ["cor", "tamanho"], // pode ser qualquer especificação cadastrada
        variantsValues: [
            {
               name: "cor",
               values: ["preto", "vermelho", "azul", "verde"]
            }
            {
               name: "tamanho",
               values: ["GG", "G", "M", "P"]
            }
        ],
        currentSelected: {
            cor: "preto",
            tamanho: "G",
        },
        selectedSku: "1", // id do sku
    }
```

### Actions

Açoes do seletor de sku

```ts
    // nome da especificação e seu valor
    type Variant = {
        name: string
        value: string
    }

    type Actions = {
        /*
        Muda o estado de currentSelected com os dados da variante selecionada
        e caso de match com algum sku disponível deverá altera o selectedSku para o sku encontrado
        caso o sku selecionado não possuir o estoque isso é uma regra de view a ser tratada
        */
        selectVariant(variant: Variant): void
    }
```
