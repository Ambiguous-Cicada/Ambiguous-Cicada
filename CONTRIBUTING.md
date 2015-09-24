# Contributing

### Workflow

1. Fork the repo and clone to your local machine
```
git clone https://github.com/<yourusername>/ambiguous-cicada.git
```
2. Set a remote to upstream
```
git remote add upstream https://github.com/ambiguous/ambiguous-cicada.git
```
3. Make a branch for the issue you're trying to fix
```
git checkout -b iss<num>
```
Example:
```
git checkout -b iss12
```
4. Make changes to fix the issue and commit with the issue number. Using an editor is prefered over '-m'
```
git commit -m '[close #<num>] <descripting commit message>'
```
Example:
```
git commit -m '[close #12] <Add server routes for "/match">'
```
5. Checkout master branch and pull any changes from upstream
```
git pull upstream master
```
6. Merge issue branch into master
```
git merge iss<num>
```
7. Fix and merge conflicts

8. Push to your fork
```
git push origin master
```
9. Make a pull request from your forked repor into the organizations repo

10. Once the pull request has been reviewed, it will be merged by another member of the team. Do not merge your own commits.

### Guidelines

1. Uphold the current code standard:
    - Keep your code [DRY][].
    - Apply the [boy scout rule][].
    - Follow [STYLE-GUIDE.md](STYLE-GUIDE.md)
2. Run the [tests][] before submitting a pull request.
3. Tests are very, very important. Submit tests if your pull request contains
   new, testable behavior.
4. Your pull request is comprised of a single ([squashed][]) commit.

### Commit Message Guidelines

- Commit messages should be written in the present tense; e.g. "Fix continuous
  integration script".
- The first line of your commit message should be a brief summary of what the
  commit changes. Aim for about 70 characters max. Remember: This is a summary,
  not a detailed description of everything that changed.
- If you want to explain the commit in more depth, following the first line should
  be a blank line and then a more detailed description of the commit. This can be
  as detailed as you want, so dig into details here and keep the first line short.

Thanks for contributing!

### Checklist:

This is just to help you organize your process

- [ ] Did I cut my work branch off of master (don't cut new branches from existing feature brances)?
- [ ] Did I follow the correct naming convention for my branch?
- [ ] Is my branch focused on a single main change?
- [ ] Do all of my changes directly relate to this change?
- [ ] Did I rebase the upstream master branch after I finished all my
  work?
- [ ] Did I write a clear pull request message detailing what changes I made?
- [ ] Did I get a code review?
- [ ] Did I make any requested changes from that code review?
