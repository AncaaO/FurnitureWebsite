let tema = localStorage.getItem("tema");
if (tema) {
    document.body.classList.add(tema);
}

window.addEventListener("DOMContentLoaded", function () {
    document.getElementById("tema2").onclick = function () {
        if (!document.body.classList.contains("dark")) {
            document.body.classList.add("dark")
            localStorage.setItem("tema", "dark");
        }

        if (document.body.classList.contains("roz")) {
            document.body.classList.remove("roz");
        }
    }


    document.getElementById("tema3").onclick = function () {
        if (!document.body.classList.contains("roz")) {
            document.body.classList.add("roz")
            localStorage.setItem("tema", "roz");
        }

        if (document.body.classList.contains("dark")) {
            document.body.classList.remove("dark");
        }
    }

    document.getElementById("tema1").onclick = function () {
        if (document.body.classList.contains("roz")) {
            document.body.classList.remove("roz");
            localStorage.removeItem("tema");
        }

        if (document.body.classList.contains("dark")) {
            document.body.classList.remove("dark");
            localStorage.removeItem("tema");
        }
    }
});