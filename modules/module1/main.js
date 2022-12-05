Promise.all([import('some-library/entry'), import('shared')]).then(async ([someLibEntry, shared]) => {
    console.log(new shared.Test(), someLibEntry.default);
    console.log(new shared.Test() instanceof someLibEntry.default);
});
