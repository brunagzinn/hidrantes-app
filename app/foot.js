//este é o footer
export function Foot() {
  return (
    <foot>
      <footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
          <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://www.bombeiros.rs.gov.br/unidades-de-atendimento" class="hover:underline">Batalhao de Bombeiros Canoas</a>. Todos os Direitos Reservados
          </span>
          <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                  <a href="#" class="hover:underline me-4 md:me-6">Desenvolvedores</a>
              </li>
              <li>
                  <a href="#" class="hover:underline me-4 md:me-6">FAQ</a>
              </li>
          </ul>
          </div>
      </footer>
    </foot>
  )
}