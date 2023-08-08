# Documentation

## 1. Component did not reload after save

**Time wasted :** One week

**Behavior :** The component only does a rerender the first time you save a changes, the second changes onwards will not be updated. When checking the source code in the browser debugger, the code will remained the same as the first changes after you spin up the development server *(via `npm run dev`)*.

**Fix :** Check the file that import the component, if the imported component filename is correct typed, especially ***MISTAKING LOWERCASE AND UPPERCASE LETTER***, as filename is **`CASE SENSITIVE`**.

## 2. Supabase Realtime changes not working

**Behavior :** The on subscribe function that is inside a `useEffect` hook to invoke when the component first render, does not reflect changes whenever a column of data is update/insert/delete. The callback function inside the `subscribe()` function does return a status of `SUBSCRIBED`, but doesn't called the callback function provided, thus no payload received message will be printed in the console.

```javascript
// File route /src/dashboard/index.js
supabase
    .from("Task")
    .on("*", (payload) => {
        console.log(payload, "payload received");
        const newTodo = payload.new;
        dispatch(updData(newTodo));
    })
    .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
            console.log(status);
        }
    });
```

**Fix :** Remove the **`<React.StrictMode></React.StrictMode>`** tag. The Supabase subscribe has invoked twice under react strict mode which cause problem for supabase.

## 3. `$RefreshSig$` is not defined

**Behavior :** After running `npm run build`, serve the **dist** output will the page will not be responsive and a console error of `$RefreshSig$` is not defined will be shown.

**Fix :**

1. exclude `node_modules` from the plugin

2. set **`NODE_ENV=development`** when using the plugin and exclude the plugin during build by setting **`NODE_ENV=production`**.

**GitHub Issue :** <https://github.com/pmmmwh/react-refresh-webpack-plugin/issues/92>

## 4. Invalid MIME file type (on deployment)

**Behavior :** Application hosted on Netlify cannot load page after having two path deep, as the expected script browser wanted to load isn't found.

**Problem :** `output.publicPath = "auto"` in `webpack.prod.js`

**Fix :** change to `output.publicPath = "/"` in `webpack.prod.js`

**Netlify support :** <https://answers.netlify.com/t/invalid-mime-type-for-js-file/75809>
