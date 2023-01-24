# Sku Selector

## Dependências

## SkuSelectorContext

### State

Exemplo do estado do contexto do quantity Selector

```ts
    {
      qtd: 4,
      skuId: "1",
      maxAvailability: 22
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
