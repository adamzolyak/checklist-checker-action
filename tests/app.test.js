
const app = require('../app')
const helpers = require('../helpers')

jest.mock('../helpers')

describe('checklistChecker', () => {
    afterEach(() => {
        jest.resetAllMocks()
      });
      
    it('should add label on opened event if incomplete checklist items', async () => {
        let eventData, isIncompleteChecklist
        helpers.readFilePromise = jest.fn(() => eventData)
        helpers.checkForIncompleteChecklist = jest.fn(() => isIncompleteChecklist)
        helpers.addLabel = jest.fn()      
        eventData = `{
            "action": "opened",
            "issue": {
                "id": 376593094,
                "number": 19,
                "title": "newissue3",
                "state": "open",
                "body": "checklist - [x] to do - [ ] to do"
            }
        }`
        isIncompleteChecklist = true

        await app.checklistChecker()

        expect(helpers.readFilePromise).toHaveBeenCalledTimes(1)
        expect(helpers.checkForIncompleteChecklist).toHaveBeenCalledTimes(1)
        expect(helpers.addLabel).toHaveBeenCalledTimes(1)
    })
    
    it('should add label on edit event if incomplete checklist items', async () => {
        let eventData, isIncompleteChecklist
        helpers.readFilePromise = jest.fn(() => eventData)
        helpers.checkForIncompleteChecklist = jest.fn(() => isIncompleteChecklist)
        helpers.addLabel = jest.fn()
        eventData = `{
            "action": "edited",
            "issue": {
                "id": 376593094,
                "number": 19,
                "title": "newissue3",
                "state": "open",
                "body": "checklist - [x] to do - [ ] to do"
            }
        }`
        isIncompleteChecklist = true

        await app.checklistChecker()

        expect(helpers.readFilePromise).toHaveBeenCalledTimes(1)
        expect(helpers.checkForIncompleteChecklist).toHaveBeenCalledTimes(1)
        expect(helpers.addLabel).toHaveBeenCalledTimes(1)
    })

    it('should add label on reopened event if incomplete checklist items', async () => {
        let eventData, isIncompleteChecklist
        helpers.readFilePromise = jest.fn(() => eventData)
        helpers.checkForIncompleteChecklist = jest.fn(() => isIncompleteChecklist)
        helpers.addLabel = jest.fn()
        eventData = `{
            "action": "reopened",
            "issue": {
                "id": 376593094,
                "number": 19,
                "title": "newissue3",
                "state": "open",
                "body": "checklist - [x] to do - [ ] to do"
            }
        }`
        isIncompleteChecklist = true

        await app.checklistChecker()

        expect(helpers.readFilePromise).toHaveBeenCalledTimes(1)
        expect(helpers.checkForIncompleteChecklist).toHaveBeenCalledTimes(1)
        expect(helpers.addLabel).toHaveBeenCalledTimes(1)
    })

    it('should remove label on opened event if NO incomplete checklist items', async () => {
        let eventData, isIncompleteChecklist
        helpers.readFilePromise = jest.fn(() => eventData)
        helpers.checkForIncompleteChecklist = jest.fn(() => isIncompleteChecklist)
        helpers.addLabel = jest.fn()      
        eventData = `{
            "action": "opened",
            "issue": {
                "id": 376593094,
                "number": 19,
                "title": "newissue3",
                "state": "open",
                "body": "checklist - [x] to do - [x] to do"
            }
        }`
        isIncompleteChecklist = false

        await app.checklistChecker()

        expect(helpers.readFilePromise).toHaveBeenCalledTimes(1)
        expect(helpers.checkForIncompleteChecklist).toHaveBeenCalledTimes(1)
        expect(helpers.removeLabel).toHaveBeenCalledTimes(1)
    })
    
    it('should remove label on edit event if NO incomplete checklist items', async () => {
        let eventData, isIncompleteChecklist
        helpers.readFilePromise = jest.fn(() => eventData)
        helpers.checkForIncompleteChecklist = jest.fn(() => isIncompleteChecklist)
        helpers.addLabel = jest.fn()
        eventData = `{
            "action": "edited",
            "issue": {
                "id": 376593094,
                "number": 19,
                "title": "newissue3",
                "state": "open",
                "body": "checklist - [x] to do - [x] to do"
            }
        }`
        isIncompleteChecklist = false

        await app.checklistChecker()

        expect(helpers.readFilePromise).toHaveBeenCalledTimes(1)
        expect(helpers.checkForIncompleteChecklist).toHaveBeenCalledTimes(1)
        expect(helpers.removeLabel).toHaveBeenCalledTimes(1)
    })

    it('should remove label on reopened event if NO incomplete checklist items', async () => {
        let eventData, isIncompleteChecklist
        helpers.readFilePromise = jest.fn(() => eventData)
        helpers.checkForIncompleteChecklist = jest.fn(() => isIncompleteChecklist)
        helpers.addLabel = jest.fn()
        eventData = `{
            "action": "reopened",
            "issue": {
                "id": 376593094,
                "number": 19,
                "title": "newissue3",
                "state": "open",
                "body": "checklist - [x] to do - [x] to do"
            }
        }`
        isIncompleteChecklist = false

        await app.checklistChecker()

        expect(helpers.readFilePromise).toHaveBeenCalledTimes(1)
        expect(helpers.checkForIncompleteChecklist).toHaveBeenCalledTimes(1)
        expect(helpers.removeLabel).toHaveBeenCalledTimes(1)
    })

    it('should reopen issue add label on closed event if incomplete checklist items', async () => {
        let eventData, isIncompleteChecklist
        helpers.readFilePromise = jest.fn(() => eventData)
        helpers.checkForIncompleteChecklist = jest.fn(() => isIncompleteChecklist)
        helpers.addLabel = jest.fn()
        eventData = `{
            "action": "closed",
            "issue": {
                "id": 376593094,
                "number": 19,
                "title": "newissue3",
                "state": "open",
                "body": "checklist - [x] to do - [x] to do"
            }
        }`
        isIncompleteChecklist = true

        await app.checklistChecker()

        expect(helpers.readFilePromise).toHaveBeenCalledTimes(1)
        expect(helpers.checkForIncompleteChecklist).toHaveBeenCalledTimes(1)
        expect(helpers.reopenIssue).toHaveBeenCalledTimes(1)
        expect(helpers.addLabel).toHaveBeenCalledTimes(1)
    })

    it('should remove label on closed event if NO incomplete checklist items', async () => {
        let eventData, isIncompleteChecklist
        helpers.readFilePromise = jest.fn(() => eventData)
        helpers.checkForIncompleteChecklist = jest.fn(() => isIncompleteChecklist)
        helpers.addLabel = jest.fn()
        eventData = `{
            "action": "closed",
            "issue": {
                "id": 376593094,
                "number": 19,
                "title": "newissue3",
                "state": "open",
                "body": "checklist - [x] to do - [x] to do"
            }
        }`
        isIncompleteChecklist = false

        await app.checklistChecker()

        expect(helpers.readFilePromise).toHaveBeenCalledTimes(1)
        expect(helpers.checkForIncompleteChecklist).toHaveBeenCalledTimes(1)
        expect(helpers.removeLabel).toHaveBeenCalledTimes(1)
    })
})
