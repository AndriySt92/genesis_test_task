export interface IMeta {
    slug: string
    skills: string[]
    courseVideoPreview: {
        link: string
        duration: number
        previewImageLink: string
    }
}

export interface ILesson {
    id: string
    title: string
    link: string
    order: number
    duration: number
    status: 'unlocked' | 'locked'
    previewImageLink: string
}

export interface ICourse {
    id: string
    title: string
    launchDate: string
    description: string
    lessonsCount: number
    lessons: ILesson[]
    containsLockedLessons: boolean
    previewImageLink: string
    rating: number
    meta: IMeta
}

export interface CourseState {
    courses: any
    pageNumber: number
    course: ICourse 
    isLoading: boolean
    error: string
}