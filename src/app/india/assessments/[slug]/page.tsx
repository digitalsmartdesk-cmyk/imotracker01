'use client'
import { useParams, notFound } from 'next/navigation'
import AssessmentRunner from './AssessmentRunner'
import { getIndiaAssessment, getIndiaQuestions } from '@/lib/india'

export default function IndiaAssessmentPage() {
  const params = useParams()
  const slug = String(params.slug)
  const meta = getIndiaAssessment(slug)
  if (!meta) return notFound()
  const questions = getIndiaQuestions(slug)
  return <AssessmentRunner meta={meta} questions={questions} />
}
