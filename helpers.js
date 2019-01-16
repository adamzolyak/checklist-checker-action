const fs = require('fs')

module.exports.readFilePromise = function(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
        if (err) reject(err);
        else resolve(data);
        })
    }).catch(err => {
        console.log(err)
    })
}

module.exports.getOwner = function(eventOwnerAndRepo) {
    const slicePos1 = eventOwnerAndRepo.indexOf("/")
    return eventOwnerAndRepo.slice(0, slicePos1)
}

module.exports.getRepo = function(eventOwnerAndRepo) {
    const slicePos1 = eventOwnerAndRepo.indexOf("/")
    return eventOwnerAndRepo.slice(slicePos1 + 1, eventOwnerAndRepo.length)
}

module.exports.checkForIncompleteChecklist = function(eventIssueBody) {      
    let regex1 = RegExp('- \\[ \\]')
    return regex1.test(eventIssueBody)
}

module.exports.addLabel = function(octokit, eventOwner, eventRepo, eventIssueNumber, label) {
    octokit.issues.addLabels({
        owner: eventOwner,
        repo: eventRepo,
        number: eventIssueNumber,
        labels: [label] // ['Incomplete Tasks']
    }).then(({ data, headers, status }) => {
        // handle data
    }).catch(err => {
        console.log(err)
    })
}

module.exports.removeLabel = function(octokit, eventOwner, eventRepo, eventIssueNumber, label) {
    octokit.issues.removeLabel({
        owner: eventOwner,
        repo: eventRepo,
        number: eventIssueNumber,
        name: label
    }).then(({ data, headers, status }) => {
        // handle data
    }).catch(err => {
        console.log(err)
    })
}

module.exports.reopenIssue = function(octokit, eventOwner, eventRepo, eventIssueNumber) {
    octokit.issues.edit({
        owner: eventOwner,
        repo: eventRepo,
        number: eventIssueNumber,
        state: 'open'
    }).then(
    octokit.issues.createComment({
        owner: eventOwner,
        repo: eventRepo,
        number: eventIssueNumber,
        body: "There is one or more incomplete checklist items on this issue.  Please complete or remove the incomplete checklist items.  Reopening the issue."
    })
    ).catch(err => {
        console.log(err)
    })
}
