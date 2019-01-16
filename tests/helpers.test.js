const helpers = require('../helpers')
let octokit = require('@octokit/rest')()

octokit = jest.fn()
octokit.authenticate = jest.fn()

describe('getOwner', () => {
    it('should return owner when passed GITHUB_REPOSITORY env variable', () => {
        const result = helpers.getOwner('waffleio/waffle.io')
        expect(result).toBe('waffleio')
    })
})

describe('getRepo', () => {
    it('should return repo when passed GITHUB_REPOSITORY env variable', () => {
        const result = helpers.getRepo('waffleio/waffle.io')
        expect(result).toBe('waffle.io')
    })
})

describe('addLabel', () => {
    it('should add label to issue', async () => {
        
        let octokit = {
            issues: {
                addLabels: jest.fn().mockResolvedValue( { something: 'something' })
            }
        }

        const result = await helpers.addLabel(octokit, 'waffleio', 'waffle.io', '1', 'Incomplete Tasks')
        expect(octokit.issues.addLabels).toHaveBeenCalledTimes(1)
        expect(octokit.issues.addLabels.mock.calls[0][0].labels).toEqual(['Incomplete Tasks'])
    })
})

describe('removeLabel', () => {
    it('should remove label from issue', async () => {
        
        let octokit = {
            issues: {
                removeLabel: jest.fn().mockResolvedValue( { something: 'something' })
            }
        }

        const result = await helpers.removeLabel(octokit, 'waffleio', 'waffle.io', '1', 'Incomplete Tasks')
        expect(octokit.issues.removeLabel).toHaveBeenCalledTimes(1)
        expect(octokit.issues.removeLabel.mock.calls[0][0].name).toEqual('Incomplete Tasks')
    })
})

describe('checkForIncompleteChecklist', () => {
    it('should be true if incomplete checklist item in issue body', async () => {  
        const eventIssueBody = 'checklist\r\n- [ ] to do'
        const result = helpers.checkForIncompleteChecklist(eventIssueBody)
        expect(result).toBe(true)
    })

    it('should be true if incomplete checklist items in issue body', async () => {  
        const eventIssueBody = 'checklist\r\n- [x] to do\r\n- [ ] to do\r\n- [ ] to do'
        const result = helpers.checkForIncompleteChecklist(eventIssueBody)
        expect(result).toBe(true)
    })

    it('should be false if no incomplete checklist items in issue body', async () => {
        const eventIssueBody = 'checklist\r\n- [x] to do\r\n- [x] to do\r\n- [x] to do'
        const result = helpers.checkForIncompleteChecklist(eventIssueBody)
        expect(result).toBe(false)
    })

    it('should be false if no checklist items in issue body', async () => {    
        const eventIssueBody = 'no checklist here'
        const result = helpers.checkForIncompleteChecklist(eventIssueBody)
        expect(result).toBe(false)
    })
})

describe('reopenIssue', () => {
    it('should reopen the specified issue', async () => {  
        
        let octokit = {
            issues: {
                edit: jest.fn().mockResolvedValue( { something: 'something' }),
                createComment: jest.fn().mockResolvedValue( { something: 'something' })
            }
        }

        const result = await helpers.reopenIssue(octokit, 'waffleio', 'waffle.io', '1')
        expect(octokit.issues.edit).toHaveBeenCalledTimes(1)
        expect(octokit.issues.createComment).toHaveBeenCalledTimes(1)
        expect(octokit.issues.createComment.mock.calls[0][0].body).toMatch(/incomplete checklist items/)
    })
})

