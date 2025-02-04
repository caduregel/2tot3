# 2 tot 3
This project is a service which can split up a large list of students into two balanced groups. The project is currently setup to do the following:

Take in a single list of students, where each student can have the following properties:
- The student's name.
- The student's gender.
- The student's cognitive level.
- The students social level.
- Three friends with whom the student would prefer to be grouped with.

After all the students have been input by a teacher, the list of students can be split into two groups, which the service attempts to give the following properties:

- Every student has at least one friend they prefered to be grouped with.
- The groups dont differ to much in size
- The groups dont differ to much in average cognitive and social levels of the students.
- The groups dont differ to much in the ammount of boys/girls in each group

# Run this project locally

If you wish to run this project locally, you can do so like this:

1. Clone this github repository
2. Run `npm install`
3. Run `npm run dev`
4. Visit [http://localhost:5173/] to view the project.