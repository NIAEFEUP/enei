import BaseLayout from '~/layouts/base'

export default function Forbidden({}: { error: any }) {
  return (
    <BaseLayout title="You should not be here">
      <div className="">
        <h1>You should not be here</h1>
      </div>
    </BaseLayout>
  )
}
