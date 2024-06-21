async function loadBlogData(file) {
    const response = await fetch(file);
    let json = await response.json();
    return json;
}

function createBlogListItem(data, shift) {
    const blogListItem = document.createElement("div");
    blogListItem.classList.add("blogListItem");
    console.log(shift);
    if (shift) {
        blogListItem.style.setProperty("justify-content", "end");
    }

    const blogItem = document.createElement("div");
    blogItem.classList.add("blogItem");
    if (shift) {
        blogItem.classList.add("blogItemLeft")
    }
    blogItem.insertAdjacentHTML('beforeend', '<img class="blogItemImage" src="../assets/images/img1.jpg"></img>');
    blogItem.insertAdjacentHTML('beforeend',
        '<div class="blogItemBody"> \
            <h3>' + data.title + '</h3> \
            <p>' + data.description + '</p>\
            </div>');

    blogListItem.appendChild(blogItem);
    return blogListItem;
}

async function main() {
    let data = null;
    data = await loadBlogData("../data/blogs.json");
    console.log(data);

    const blogList = document.getElementById("blogList");
    let i = 0;
    for (let key of Object.keys(data)) {
        console.log(i);
        blogList.appendChild(createBlogListItem(data[key], i % 2 == 1));
        i++;
    }
}

main();