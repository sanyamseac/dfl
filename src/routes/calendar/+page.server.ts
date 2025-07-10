import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
	// In the future, this could fetch calendar events from the database
	// For now, we'll use static data in the component
	return {
		user: event.locals.user,
		// events: await getCalendarEvents() // Future implementation
	}
}
