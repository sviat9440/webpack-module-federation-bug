# FrontPolis Utils

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/91bab87246cc420884e060b3e5486da6)](https://www.codacy.com?utm_source=bitbucket.org&amp;utm_medium=referral&amp;utm_content=b2bpolis/front-polis-utils&amp;utm_campaign=Badge_Grade)

### Описание
Библиотека FrontPolis Utils содержит утилиты для использования во Front-End
 разработке, независимо от используемых фреимворков.

### Установка
Необходимо настроить NPM-Registry. Инструкция по настройке находится
[здесь](https://b2bpolis.atlassian.net/wiki/spaces/B2BPOL/pages/776077319/-+NPM+Registry+Libs).

`npm i @front-polis/utils`

### Примеры

#### Утилита для сортировки массива
```typescript
const array = [1, 0, 5, 3, 4, 2];

class SortStrategyASC extends Sort.Strategy<number> {
    public compare(a: number, b: number): Sort.Result {
        if (a === b) {
          return Sort.Skip;
        }
        return a < b ? -1 : 1;
    }
}

const sorter: Sort.Sorter<number> = new Sort.Sorter(new SortStrategyASC())

sorter.sort(array) // [0, 1, 2, 3, 4, 5]
```

# Миграции
## 3.X.X -> 4.X.X
### 1. Значения по умолчанию для сериализаторов
У матчеров типа Object и Array убрана возможность указать в конфиге значение по умолчанию
```typescript
// 3.X.X
class Example extends Serializer.Object {
  @Serializer.property({
    path: ['path'],
    matcher: Serializer.Types.Object({
      type: SubType,
      default: new SubType(), // <---
    }),
  })
  property: SubType;

  @Serializer.property({
    path: ['path'],
    matcher: Serializer.Types.Array({
      type: SubType,
      default: [], // <---
    }),
  })
  arrayProperty: SubType[];
}

// 4.X.X
class Example extends Serializer.Object {
  @Serializer.property({
    path: ['path'],
    matcher: Serializer.Types.Object({
      type: SubType,
    }),
  })
  property: SubType = new SubType(); // <---

  @Serializer.property({
    path: ['path'],
    matcher: Serializer.Types.Array({
      type: SubType,
    }),
  })
  arrayProperty: SubType[] = []; // <---
}
```
### 2. `defaultFactory` не применяется при сериализации.
`defaultFactory` теперь выполняется только при создании экземпляра и при десериализации.
```typescript
class Example extends Serializer.Object {
  @Serializer.property({
    path: ['property'],
    matcher: Serializer.Types.Object({
      type: SubType,
      defaultFactory: new SubType(),
    }),
  })
  property: SubType;
}

// 3.X.X
const instance = Serializer.create(Example, {});
console.log(instance.property) // {}
instance.property = undefined;
console.log(Serializer.serialize(instance)); // {property : {}}

// 4.X.X
const instance = Serializer.create(Example, {});
console.log(instance.property) // {}
instance.property = undefined;
console.log(Serializer.serialize(instance)); // {property: undefined}
```
