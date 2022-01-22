import React from "react";
import Link from "next/link";
import Grid from "../components/Grid";
import GridFilters from "../components/GridFilters";
import Footer from "../components/Footer";
import { queryRepeatableDocuments } from '../lib/content'
import { slugify } from '../lib/utilities'

const DEFAULT_FILTER = null

export default function Home({ locale, pages, projects }) {
  const filters = Array.from(new Set(projects.map(item => item.data.category)))
  const [activeFilter, setActiveFilter] = React.useState(DEFAULT_FILTER)
  const onClick = React.useCallback((filter) => {
    setActiveFilter(activeFilter === filter ? DEFAULT_FILTER : filter)
  })

  return (
    <div>
      <Grid items={projects} activeFilter={activeFilter} filters={filters} />
      <Footer pages={pages} locale={locale}>
        <GridFilters activeFilter={activeFilter} filters={filters} onClick={onClick} />
      </Footer>
    </div>
  );
};

export async function getStaticProps({ locale, preview }) {
  const content = await queryRepeatableDocuments(locale)
  const pages = content.filter(item => item.type === 'page')
  const projects = content.filter(item => item.type === 'project')

  return {
    props: {
      locale,
      pages,
      projects,
    },
  }
}
