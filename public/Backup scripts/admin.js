<script>
function loadHTML(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => document.getElementById(id).innerHTML = data)
        .catch(err => console.log("Error load:", file))
}
loadHTML("header", "header.html");
loadHTML("hero", "hero.html");
loadHTML("footer", "footer.html");
loadHTML("adminPanel", "adminpanel.html");
</script>
