import React, { useEffect, useMemo, useRef, useState } from 'react'
import { projectsData } from './Data'
import WorksItems from './WorkItems'
import ProjectModal from './ProjectModal'

const FILTERS = [
    { id: 'all', label: 'All', test: () => true },
    { id: 'live', label: 'Live demos', test: (p) => Boolean(p.demo) },
    { id: 'source', label: 'Source code', test: (p) => Boolean(p.link) },
]

// Every search term must appear somewhere in the project's text
const matchesQuery = (project, query) => {
    if (!query) return true

    const haystack = [
        project.title,
        project.role,
        project.year,
        project.description,
        ...(Array.isArray(project.tech) ? project.tech : []),
    ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

    return query.split(/\s+/).every((term) => haystack.includes(term))
}

const Work = () => {
    const [filter, setFilter] = useState('all')
    const [query, setQuery] = useState('')
    const [activeId, setActiveId] = useState(null)
    const triggerRef = useRef(null)

    // Live-demo projects surface first — visitors see what they can click through right now
    const sortedProjects = useMemo(
        () => [...projectsData].sort((a, b) => (a.demo ? 0 : 1) - (b.demo ? 0 : 1)),
        []
    )

    const counts = useMemo(
        () =>
            FILTERS.reduce(
                (acc, f) => ({ ...acc, [f.id]: sortedProjects.filter(f.test).length }),
                {}
            ),
        [sortedProjects]
    )

    // Hide filters that would match nothing (e.g. no project has a live demo)
    const availableFilters = FILTERS.filter((f) => f.id === 'all' || counts[f.id] > 0)

    const normalizedQuery = query.trim().toLowerCase()
    const activeFilter = FILTERS.find((f) => f.id === filter) || FILTERS[0]

    const visibleProjects = useMemo(
        () =>
            sortedProjects.filter(
                (p) => activeFilter.test(p) && matchesQuery(p, normalizedQuery)
            ),
        [sortedProjects, activeFilter, normalizedQuery]
    )

    const activeIndex =
        activeId === null ? -1 : visibleProjects.findIndex((p) => p.id === activeId)
    const activeProject = activeIndex >= 0 ? visibleProjects[activeIndex] : null

    // Return focus to whatever opened the dialog once it closes
    useEffect(() => {
        if (activeId === null) triggerRef.current?.focus?.()
    }, [activeId])

    const openProject = (id) => {
        triggerRef.current = document.activeElement
        setActiveId(id)
    }

    const closeProject = () => setActiveId(null)

    const goTo = (offset) => {
        const total = visibleProjects.length
        if (total < 2 || activeIndex < 0) return
        setActiveId(visibleProjects[(activeIndex + offset + total) % total].id)
    }

    const clearFilters = () => {
        setFilter('all')
        setQuery('')
    }

    const total = sortedProjects.length
    const shown = visibleProjects.length
    const noun = total === 1 ? 'project' : 'projects'
    const countText =
        shown === total ? `Showing all ${total} ${noun}` : `Showing ${shown} of ${total} ${noun}`

    return (
        <>
            <div className="work__toolbar">
                {availableFilters.length > 1 ? (
                    <div className="work__filters" role="group" aria-label="Filter projects">
                        {availableFilters.map((f) => (
                            <button
                                key={f.id}
                                type="button"
                                className={`work__filter ${filter === f.id ? 'work__filter--active' : ''}`}
                                aria-pressed={filter === f.id}
                                onClick={() => setFilter(f.id)}
                            >
                                {f.label}
                                <span className="work__filter-count">{counts[f.id]}</span>
                            </button>
                        ))}
                    </div>
                ) : (
                    <span></span>
                )}

                <div className="work__search">
                    <i className="uil uil-search work__search-icon" aria-hidden="true"></i>
                    <input
                        type="search"
                        className="work__search-input"
                        placeholder="Search projects..."
                        aria-label="Search projects"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoComplete="off"
                    />
                    {query && (
                        <button
                            type="button"
                            className="work__search-clear"
                            aria-label="Clear search"
                            onClick={() => setQuery('')}
                        >
                            <i className="uil uil-times" aria-hidden="true"></i>
                        </button>
                    )}
                </div>
            </div>

            <p className="work__count" aria-live="polite">
                {countText}
            </p>

            {shown > 0 ? (
                <ul className="work__list">
                    {visibleProjects.map((project, index) => (
                        <WorksItems
                            item={project}
                            index={index}
                            key={project.id}
                            onOpen={openProject}
                        />
                    ))}
                </ul>
            ) : (
                <div className="work__empty" role="status">
                    <i className="uil uil-search work__empty-icon" aria-hidden="true"></i>
                    <h3 className="work__empty-title">No projects match your search</h3>
                    <p className="work__empty-text">
                        Try a different keyword or clear the filters to see everything.
                    </p>
                    <button type="button" className="work__ghost" onClick={clearFilters}>
                        Clear filters
                    </button>
                </div>
            )}

            {activeProject && (
                <ProjectModal
                    project={activeProject}
                    index={activeIndex}
                    total={shown}
                    onClose={closeProject}
                    onPrev={() => goTo(-1)}
                    onNext={() => goTo(1)}
                />
            )}
        </>
    )
}

export default Work