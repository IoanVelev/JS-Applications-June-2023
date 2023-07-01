async function solution() {
    const main = document.getElementById("main");
    const url = `http://localhost:3030/jsonstore/advanced/articles/list`;
    const res = await fetch(url);
    const data = await res.json();
    data.forEach((a) => {
        const div1 = document.createElement("div");
        div1.classList.add("accordion");
        const div2 = document.createElement("div");
        div2.classList.add("head");
        const span = document.createElement("span");
        span.textContent = a.title;
        const button = document.createElement("button");
        button.setAttribute("id", a._id);
        button.textContent = "More";
        button.classList.add("button");
        const div3 = document.createElement("div");
        div3.classList.add("extra");
        const p = document.createElement("p");
        div3.appendChild(p);
        div2.appendChild(span);
        div2.appendChild(button);
        div1.appendChild(div2);
        div1.appendChild(div3);
        main.appendChild(div1);
        button.addEventListener("click", toggle);

        async function toggle(ev) {
            const id = ev.target.id;
            const url2 = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
            const res2 = await fetch(url2);
            const data2 = await res2.json();
            p.textContent = data2.content;
            if (ev.target.textContent == "More") {
                ev.target.textContent = "Less";
                div3.style.display = "block";
            } else {
                ev.target.textContent = "More";
                div3.style.display = "none";
            }
        }
    });
}
solution();
