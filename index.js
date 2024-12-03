// GLOBAL
var nameSite = document.getElementById('SiteName')
var urlSite = document.getElementById('SiteURL')
var list;

// LOCAL STORAGE
if (localStorage.getItem('site') !== null) {
    list = JSON.parse(localStorage.getItem('site'))
    displaySites()
} else {
    list = []
}

// ADD
function addSites() {
    if (isValidName() && isValidURL()) {
        var site = {
            sName: nameSite.value,
            sUrl: urlSite.value,
        }
        list.push(site)
        localStorage.setItem('site', JSON.stringify(list))
        displaySites()
        clearSites()
    } else {
        Swal.fire({
            html: `<i class="fa-solid fa-circle text-danger me-1"></i><i class="fa-solid fa-circle text-warning me-1"></i><i class="fa-solid fa-circle text-success"></i><br><b>Site Name or Url is not valid, Please follow the rules below :</b><br><i class="fa-regular fa-circle-right text-danger me-1"></i><span>Site name must contain at least 3 characters</span><br><i class="fa-regular fa-circle-right text-danger me-1"></i><span>Site URL must be a valid one</span>`,
            showCloseButton: true,
        });
    }
}

// DISPLAY
function displaySites() {
    var cartona = ``
    for (var i = 0; i < list.length; i++) {
        cartona += `<tr class="align-middle">
                <td>${i + 1}</td>
                <td>${list[i].sName}</td>
                <td><a href="${list[i].sUrl}" target="_blank" class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit</a></td>
                <td><button class="btn btn-danger" onclick="deleteSites(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
            </tr>`
    }
    document.getElementById('sitesBody').innerHTML = cartona
}

// CLEAR
function clearSites() {
    nameSite.value = null
    urlSite.value = null
    document.getElementById("SiteName").classList.remove("is-valid")
    document.getElementById("SiteURL").classList.remove("is-valid")
}

// DELETE
function deleteSites(index) {
    list.splice(index, 1)
    displaySites()
    localStorage.setItem("site", JSON.stringify(list))
}

// VALIDATION NAME
function isValidName() {
    var regex = /^[\d\w]{3,}$/
    if (regex.test(nameSite.value)) {
        document.getElementById("SiteName").classList.add("is-valid")
        document.getElementById("SiteName").classList.remove("is-invalid")
        return true
    } else {
        document.getElementById("SiteName").classList.add("is-invalid")
        document.getElementById("SiteName").classList.remove("is-valid")
        return false
    }
}

// VALIDATION URL
function isValidURL() {
    var regex = /^http[s]?:\/\/(www\.)?\w*\.com\/?$/
    if (regex.test(urlSite.value)) {
        document.getElementById("SiteURL").classList.add("is-valid")
        document.getElementById("SiteURL").classList.remove("is-invalid")
        return true
    } else {
        document.getElementById("SiteURL").classList.add("is-invalid")
        document.getElementById("SiteURL").classList.remove("is-valid")
        return false
    }
}