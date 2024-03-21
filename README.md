## Pawsible Backend

npm install

### Data Structure
#### User Profile
- username
- paws: available number of paws
- address: precise location
- zipCode: used for matching
- bio: introduction
- perferred-contact-method: email/text/phone
    - email
    - phone-number
- pets (array of {})
    - name
    - type: dog/cat/others
    - breed
    - age
    - gender
    - care-instruction: string
    - picture
- My preference for pet sitting for others 
    - distance from me
    - gender of owner? 
    - type-of-pet: dog/cat
    - additional-services: walking, grooming
    - availability
- verified?
- social-media-links
- emergency
    - contact
    - vet

#### Pet Sitting Request
- createUser (uid)
- targetUser (uid)
- status: pending/approved/rejected
- time
- date
- isRecurring
- createdTime
